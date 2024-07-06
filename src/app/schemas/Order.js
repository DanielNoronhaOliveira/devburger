import mongoose from "mongoose";



const OrderSchema = new mongoose.Schema({
        user: {
            id: {
                type: string,
                required: true,
            },
            name: {
                type: string,
                required: true,
            },
        },
            Products: [
                {
                    id: {
                      type: Number,
                      required: true,
                    },
                    name: {
                        type: string,
                        required: true,
                    },
                    price: {
                        type: Number,
                        required: true,
                    },
                    category: {
                        type: string,
                        required: true,
                    },
                    url: {
                        type: string,
                        required: true,
                    },
                    quantity: {
                        type: string,
                        required: true,
                    },
                },
            ],
            status: {
                type: string,
                required: true,
            },
        },
        {
            timestamps: true,
        },
    
);

export default mongoose.model('Order', OrderSchema);