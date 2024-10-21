const { json } = require("express");
const connection = require("./config/database");

module.exports = {
    getInvoices: (limit, offset) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT 
                    i.invoice_no,
                    i.date,
                    i.customer,
                    i.salesperson,
                    i.payment_type,
                    i.notes,
                    SUM(ps.total_cogs) AS total_cogs,
                    SUM(ps.total_price) AS total_price
                FROM 
                    invoice i
                JOIN 
                    product_sold ps ON i.invoice_no = ps.invoice_no
                GROUP BY 
                    i.invoice_no, i.date, i.customer, i.salesperson, i.payment_type, i.notes
                LIMIT ? OFFSET ?;
                `,
                [limit, offset],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },
    
    getInvoicesReports: (graph) => {
        return new Promise((resolve, reject) => {
            switch(graph){
                case 'daily':
                    connection.query(
                        `SELECT 
                            DATE_FORMAT(DATE(i.date), '%b %d') AS day, 
                            DAYNAME(i.date) AS day_name,
                            SUM(ps.total_price) AS total_sales
                        FROM 
                            invoice i
                        JOIN 
                            product_sold ps ON i.invoice_no = ps.invoice_no
                        WHERE 
                            i.date >= CURDATE() - INTERVAL 6 DAY
                        GROUP BY 
                            DATE(i.date)
                        ORDER BY 
                            DATE(i.date) ASC;
                        `,
                        (error, results) => {
                            if (error) {
                                return reject(error);
                            }
                            resolve(results);
                        }
                    );
                case 'weekly':
                    connection.query(
                        `SELECT
                            DATE_FORMAT(DATE_SUB(i.date, INTERVAL (WEEKDAY(i.date)) DAY), '%b %d, %Y') AS week_start,
                            CONCAT(DATE_FORMAT(DATE_SUB(i.date, INTERVAL (WEEKDAY(i.date)) DAY), '%Y-%m-%d'), ' - ', 
                                DATE_FORMAT(DATE_ADD(i.date, INTERVAL (6 - WEEKDAY(i.date)) DAY), '%Y-%m-%d')) AS week_range,
                            SUM(ps.total_price) AS total_sales
                        FROM 
                            invoice i
                        JOIN 
                            product_sold ps ON i.invoice_no = ps.invoice_no
                        WHERE 
                            i.date >= CURDATE() - INTERVAL 4 WEEK
                        GROUP BY 
                            YEARWEEK(i.date, 1)
                        ORDER BY 
                            YEARWEEK(i.date, 1) ASC;
                        `,
                        (error, results) => {
                            if (error) {
                                return reject(error);
                            }
                            resolve(results);
                        }
                    );
                case 'monthly':
                    connection.query(
                        `SELECT 
                            DATE_FORMAT(i.date, '%b %Y') AS month, 
                            SUM(ps.total_price) AS total_sales
                        FROM 
                            invoice i
                        JOIN 
                            product_sold ps ON i.invoice_no = ps.invoice_no
                        WHERE 
                            i.date >= CURDATE() - INTERVAL 12 MONTH
                        GROUP BY 
                            DATE_FORMAT(i.date, '%Y-%m')
                        ORDER BY 
                            DATE_FORMAT(i.date, '%Y-%m') ASC;
                        `,
                        (error, results) => {
                            if (error) {
                                return reject(error);
                            }
                            resolve(results);
                        }
                    );
            }
        });
    },

    getInvoice: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT 
                    *
                FROM 
                    invoice
                WHERE
                    invoice_no = ?;
                `,
                [id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },
    
    getCountInvoices: () => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT COUNT(*) AS total_invoices FROM invoice`, 
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },
    
    createInvoice: (body) => {
        const date = new Date();
        
        return new Promise((resolve, reject) => {
            const stockCheckPromises = body.products.map(product => {
                return new Promise((resolve, reject) => {
                    connection.query(
                        `SELECT product_name, stock FROM product WHERE product_name = ?;`,
                        [product.item],
                        (error, productResult) => {
                            if (error) {
                                return reject(error);
                            }
                            const productData = productResult[0];
    
                            if (productData.stock === 0) {
                                return reject(new Error(`${product.item} is out of stock`));
                            }
    
                            resolve(productData);
                        }
                    );
                });
            });
    
            Promise.all(stockCheckPromises)
                .then(() => {
                    connection.query(
                        `INSERT INTO invoice (date, customer, salesperson, payment_type, notes, created_at) VALUES (?, ?, ?, ?, ?, ?)`, 
                        [
                            body.date, 
                            body.customer, 
                            body.salesperson, 
                            body.payment_type, 
                            body.notes,
                            date
                        ],
                        (error, invoiceResult) => {
                            if (error) {
                                return reject(error);
                            }
    
                            const invoice_no = invoiceResult.insertId;
    
                            const productInsertPromises = body.products.map(product => {
                                return new Promise((resolve, reject) => {
                                    connection.query(
                                        `SELECT product_name, stock, cogs, price FROM product WHERE product_name = ?;`,
                                        [product.item],
                                        (error, productResult) => {
                                            if (error) {
                                                return reject(error);
                                            }
    
                                            const productData = productResult[0];
                                            const total_cogs = productData.cogs * product.quantity;
                                            const total_price = productData.price * product.quantity;
    
                                            connection.query(
                                                `INSERT INTO product_sold (invoice_no, item, quantity, total_cogs, total_price) VALUES (?, ?, ?, ?, ?)`, 
                                                [invoice_no, product.item, product.quantity, total_cogs, total_price],
                                                (error, productSoldResult) => {
                                                    if (error) {
                                                        return reject(error);
                                                    }
    
                                                    const newStock = productData.stock - product.quantity;
                                                    connection.query(
                                                        `UPDATE product SET stock = ? WHERE product_name = ?;`,
                                                        [newStock, product.item],
                                                        (error, stockUpdateResult) => {
                                                            if (error) {
                                                                return reject(error);
                                                            }
                                                            resolve(stockUpdateResult);
                                                        }
                                                    );
                                                }
                                            );
                                        }
                                    );
                                });
                            });
    
                            Promise.all(productInsertPromises)
                                .then(results => {
                                    resolve({
                                        message: 'Invoice and products inserted successfully',
                                        invoice_no: invoice_no,
                                        productResults: results
                                    });
                                })
                                .catch(error => {
                                    reject(error); 
                                });
                        }
                    );
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    
    
    getProducts: () => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT 
                    *
                FROM 
                    product;
                `,
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },
    
    getProductsSoldByNo: (invoice_no) => {
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT 
                    *
                FROM 
                    product_sold
                WHERE
                    invoice_no = ?;
                `,
                [invoice_no],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },
}