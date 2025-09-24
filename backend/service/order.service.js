const { db, query } = require("../config/dbConfig");

async function createOrder(data) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const insertOrderQuery = 'INSERT INTO orders (customer_id, employee_id, vehicle_id, order_date,active_order, order_hash) VALUES (?, ?, ?, ?, ?,?)';
    console.log(data.order_hash);
    const [orderResult] = await conn.query(insertOrderQuery, [
      data.customer_id,
      data.employee_id,
      data.vehicle_id,
      data.order_date,
      data.active_order,
      data.order_hash
    ]);

    if (orderResult.affectedRows === 0) {
      throw new Error('Order creation failed');
    }

    const orderId = orderResult.insertId;

    // Insert services
    for (const service of data.services) {
      const [result2] = await conn.query(
        'INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?, ?, ?)',
        [orderId, service.service_id, false]
      );

      if (result2.affectedRows === 0) {
        throw new Error('Order service creation failed');
      }
    }

    // Insert order info
    const query3 = `
      INSERT INTO order_info 
      (order_id, order_total_price, estimated_completion_date, completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const [result3] = await conn.query(query3, [
      orderId,
      data.order_total_price,
      data.estimated_completion_date,
      data.completion_date,
      data.additional_request,
      data.notes_for_internal_use,
      data.notes_for_customer,
      data.additional_requests_completed
    ]);

    if (result3.affectedRows === 0) {
      throw new Error('Order info creation failed');
    }

    // Insert order status
    const query4 = 'INSERT INTO order_status (order_id, order_status) VALUES (?, ?)';
    const [result4] = await conn.query(query4, [orderId, data.order_status]);

    if (result4.affectedRows === 0) {
      throw new Error('Order status creation failed');
    }

    await conn.commit();
    console.log('Order created successfully:', orderId);
    return { orderId };
  } catch (error) {
    await conn.rollback();
    console.error('Error creating order:', error);
    throw new Error('Order creation failed');
  } finally {
    conn.release();
  }
}


async function getAllOrders() {
    const conn = await db.getConnection();
    try {
        const [rows] = await conn.query(`
            SELECT orders.order_id, orders.customer_id, orders.employee_id, orders.vehicle_id,
                   orders.order_date, order_info.estimated_completion_date, order_info.completion_date,
                   order_info.notes_for_customer AS order_description,
                   customer_info.customer_first_name, customer_info.customer_last_name,
                   customer_vehicle_info.vehicle_year, customer_vehicle_info.vehicle_serial, customer_vehicle_info.vehicle_model,
                   order_status.order_status = 'completed' AS order_completed,
                   employee_info.employee_first_name, employee_info.employee_last_name
            FROM orders
            JOIN order_info ON orders.order_id = order_info.order_id
            JOIN order_status ON orders.order_id = order_status.order_id
            JOIN customer_info ON orders.customer_id = customer_info.customer_id
            JOIN customer_vehicle_info ON orders.vehicle_id = customer_vehicle_info.vehicle_id
            JOIN employee_info ON orders.employee_id = employee_info.employee_id
        `);
        console.log(rows);

        const orders = rows;

        for (const order of orders) {
            const [rows] = await conn.query(
                'SELECT * FROM order_services WHERE order_id = ?',
                [order.order_id]
            );
            order.order_services = rows;
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
        const [orders] = await conn.query(`
            SELECT orders.order_id, orders.customer_id, orders.employee_id, orders.vehicle_id,
                   orders.order_date,order_info.additional_request,
                   order_status.order_status = 'completed' AS order_completed,
                   customer_info.customer_first_name, customer_info.customer_last_name,customer_identifier.customer_phone_number,customer_identifier.customer_email,
                   customer_vehicle_info.vehicle_year, customer_vehicle_info.vehicle_serial, customer_vehicle_info.vehicle_model

            FROM orders
            JOIN order_info ON orders.order_id = order_info.order_id
            JOIN customer_info ON orders.customer_id = customer_info.customer_id
            JOIN customer_identifier ON orders.customer_id = customer_identifier.customer_id
            JOIN customer_vehicle_info ON orders.vehicle_id = customer_vehicle_info.vehicle_id
            JOIN order_status ON orders.order_id = order_status.order_id
            WHERE orders.order_id = ?
        `, [orderId]);
        // console.log(orders)
        if (orders.length === 0) return null;

        const order = orders[0];
        const [services] = await conn.query(
            'SELECT * FROM order_services WHERE order_id = ?',
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

async function getOrderByCustomerId(customerId) {
    const conn = await db.getConnection();
    try {
        const [orders] = await conn.query(`
            SELECT orders.order_id, orders.customer_id, orders.employee_id, orders.vehicle_id,
                   orders.order_date, order_info.additional_request,
                   order_status.order_status = 'completed' AS order_completed,
                   customer_info.customer_first_name, customer_info.customer_last_name,
                   customer_identifier.customer_phone_number, customer_identifier.customer_email,
                   customer_vehicle_info.vehicle_year, customer_vehicle_info.vehicle_serial, customer_vehicle_info.vehicle_model

            FROM orders
            JOIN order_info ON orders.order_id = order_info.order_id
            JOIN customer_info ON orders.customer_id = customer_info.customer_id
            JOIN customer_identifier ON orders.customer_id = customer_identifier.customer_id
            JOIN customer_vehicle_info ON orders.vehicle_id = customer_vehicle_info.vehicle_id
            JOIN order_status ON orders.order_id = order_status.order_id
            WHERE orders.customer_id = ?
        `, [customerId]);

        if (orders.length === 0) return null;

        // For each order, fetch its services
        for (let order of orders) {
            const [services] = await conn.query(
                'SELECT * FROM order_services WHERE order_id = ?',
                [order.order_id]
            );
            order.order_services = services;
        }

        return orders;
    } catch (err) {
        console.error('Error fetching orders by customer ID:', err);
        throw err;
    } finally {
        conn.release();
    }
}


module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByCustomerId
};
