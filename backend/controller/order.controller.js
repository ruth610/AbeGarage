const OrderService = require('../service/order.service');

async function createOrder(req, res) {
  try {
    const {
      customer_id,
      employee_id,
      vehicle_id,
      service_id,
      order_status = 'pending', // default if not provided
      order_total_price = 0,
      estimated_completion_date = null,
      completion_date = null,
      additional_request = '',
      notes_for_internal_use = '',
      notes_for_customer = '',
      additional_requests_completed = false
    } = req.body;

    const order_date = new Date(); // Set current date
    const service_completed = order_status === 'completed' ? 'completed' : 'pending';
    const active_order = true; // You can adjust based on logic
    const order_hash = Math.random().toString(36).substring(2, 15); // example hash

    const orderData = {
      customer_id,
      employee_id,
      vehicle_id,
      service_id,
      order_status,
      order_total_price,
      estimated_completion_date,
      completion_date,
      additional_request,
      notes_for_internal_use,
      notes_for_customer,
      additional_requests_completed,
      order_date,
      service_completed,
      active_order,
      order_hash
    };

    const newOrder = await OrderService.createOrder(orderData);
    if (!newOrder) {
      return res.status(400).json({ message: 'Could not create order' });
    }

    return res.status(201).json({ message: 'Order created successfully', order: newOrder });

  } catch (error) {
    console.error('Order creation error:', error);
    return res.status(500).json({ message: 'Error creating order', error: error.message });
  }
}


async function getAllOrders(req, res) {
    try {
        const orders = await OrderService.getAllOrders();
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching orders', error: err.message });
    }
}

async function getOrderById(req, res) {
    try {
        const orderId = req.params.id;
        const order = await OrderService.getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json([order]); // wrap in array to match your format
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching order', error: err.message });
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById
};

