const {
    getInvoices,
    getCountInvoices,
    createInvoice,
    getProducts,
    getProductsSoldByNo,
    getInvoice,
    getInvoicesReports
} = require("./service");
  
module.exports = {
    checkEndpoint: (req, res) => {
        return res.json({
            status: "API is running"
        })
    },

    getInvoices: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 6;
            const offset = (page - 1) * limit;
            
            const invoiceResult = await getInvoices(limit, offset);
    
            const countResult = await getCountInvoices()
            const totalData = countResult[0].total_invoices
            const totalPages = Math.ceil(totalData / limit)
    
            return res.status(200).json({
                status_code: 200,
                data: invoiceResult,
                total: totalData,
                pagination: {
                    current_page: page,
                    next_page: page < totalPages ? page + 1 : null,
                    prev_page: page > 1 ? page - 1 : null,
                    total_pages: totalPages,
                    data_perpage: limit
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status_code: 500,
                message: "Internal Server Error"
            });
        }
    },

    getInvoice: async (req, res) => {
        try {
            const result = await getInvoice(req.params.id);
    
            return res.status(200).json({
                status_code: 200,
                data: result,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status_code: 500,
                message: "Internal Server Error"
            });
        }
    },

    getInvoicesReports: async (req, res) => {
        try {
            const reportResult = await getInvoicesReports(req.params.graph);
    
            return res.status(200).json({
                status_code: 200,
                data: reportResult,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status_code: 500,
                message: "Internal Server Error"
            });
        }
    },

    createInvoice: async (req, res) => {
        try {
            const productsResult = await getProducts();

            const createInvoiceResult = await createInvoice(req.body, productsResult);
    
            return res.status(201).json({
                status_code: 201,
                message: "Invoice Created",
                data: createInvoiceResult
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status_code: 500,
                message: "Internal Server Error"
            });
        }
    },

    getProducts: async (req, res) => {
        try {
            const productResult = await getProducts();
    
            return res.status(200).json({
                status_code: 200,
                data: productResult,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status_code: 500,
                message: "Internal Server Error"
            });
        }
    },

    getProductsSoldByNo: async (req, res) => {
        try {
            const result = await getProductsSoldByNo(req.params.id);
    
            return res.status(200).json({
                status_code: 200,
                data: result,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status_code: 500,
                message: "Internal Server Error"
            });
        }
    },
}