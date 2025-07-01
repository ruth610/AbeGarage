const { db, query } = require("../config/dbConfig");

async function createOrder(data){
    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();
        const query = 'INSERT INTO orders (customer_id,employee_id, vehicle_id, service_id, order_date, status) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await query(query, [data.customer_id,data.employee_id, data.vehicle_id, data.service_id, data.order_date, data.order_status]);
        if (result.affectedRows === 0) {
            throw new Error('Order creation failed');
        }
        const orderId = result.insertId;
        const query2 = 'INSERT INTO order_services (order_id, service_id,service_completed) VALUES (?, ?, ?)';
        const [result2] = await query(query2, [orderId, data.service_id, data.service_completed]);
        if (result2.affectedRows === 0) {
            throw new Error('Order service creation failed');
        }

        const query3 = 'INSERT INTO order_info (order_id, order_total_price, estimated_completion_date,completion_date,additional_request,notes_for_internal_use,notes_for_customer,additional_requests_completed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [result3] = await query(query3, [orderId, data.order_total_price, data.estimated_completion_date, data.completion_date, data.additional_request, data.notes_for_internal_use, data.notes_for_customer, data.additional_requests_completed]);
        if (result3.affectedRows === 0) {
            throw new Error('Order info creation failed');
        }
        const query4 = 'INSERT INTO order_status (order_id, order_status) VALUES (?, ?)';
        const [result4] = await query(query4, [orderId, data.order_status]);
        if (result4.affectedRows === 0) {
            throw new Error('Order status creation failed');
        }
        await conn.commit();
        console.log('Order created successfully:', data);
        return data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Order creation failed');
    } finally {
        conn.release();
    }
}

async function getAllOrders() {
    const conn = await db.getConnection();
    try {
        const [orders] = await query(`
            SELECT orders.id AS order_id, orders.customer_id, orders.employee_id, orders.vehicle_id,
                   orders.order_date, order_info.estimated_completion_date, order_info.completion_date,
                   order_info.notes_for_customer AS order_description,
                   order_status.order_status = 'completed' AS order_completed
            FROM orders
            JOIN order_info ON orders.id = order_info.order_id
            JOIN order_status ON orders.id = order_status.order_id
        `);

        for (const order of orders) {
            const [services] = await query(
                'SELECT service_id FROM order_services WHERE order_id = ?',
                [order.order_id]
            );
            order.order_services = services;
        }

        return orders;
    } catch (err) {
        console.error('Error fetching all orders:', err);
        throw err;
    } finally {
        conn.release();
    }
}

async function getOrderById(orderId) {
    const conn = await db.getConnection();
    try {
        const [orders] = await query(`
            SELECT orders.id AS order_id, orders.customer_id, orders.employee_id, orders.vehicle_id,
                   orders.order_date, order_info.estimated_completion_date, order_info.completion_date,
                   order_info.notes_for_customer AS order_description,
                   order_status.order_status = 'completed' AS order_completed
            FROM orders
            JOIN order_info ON orders.id = order_info.order_id
            JOIN order_status ON orders.id = order_status.order_id
            WHERE orders.id = ?
        `, [orderId]);

        if (orders.length === 0) return null;

        const order = orders[0];
        const [services] = await query(
            'SELECT service_id FROM order_services WHERE order_id = ?',
            [orderId]
        );
        order.order_services = services;

        return order;
    } catch (err) {
        console.error('Error fetching order by ID:', err);
        throw err;
    } finally {
        conn.release();
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById
};
