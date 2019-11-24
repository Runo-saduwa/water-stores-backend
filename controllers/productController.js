const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports = {
    createProduct : async (req, res) => {
        const slug = req.body.name.replace(/ /g, '-') +'-'+ Date.now();

        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            slug: slug,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description,
            productPic: req.body.productPic,
            keyword: req.body.keyword,
            category: req.body.category,
            createdBy: req.body.createdBy
        });


       try {
        await product.save();
        res.status(201).json({
            message: product
        })
       } catch(e) {
          res.status(500).json({
              error: e
          })
       }
    
    },
    getAllProducts: async () => {
        try {
            const products = await Product.find({});

            if(!products){
                return res.json({
                    message: "could'nt fetch any products"
                })
            }

            res.status(201).json({
                message: products
            })

        } catch(e) {
            res.json({
                error: e
            })
        }
    },

    
}