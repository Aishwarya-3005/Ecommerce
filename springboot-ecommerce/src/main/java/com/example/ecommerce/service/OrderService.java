package com.example.ecommerce.service;

import com.example.ecommerce.model.Order;
import com.example.ecommerce.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public String addOrder(Order order) {
        Order newOrder = new Order();

        newOrder.setCartItems(order.getCartItems());
        newOrder.setTotalCartQuantity(order.getTotalCartQuantity());
        newOrder.setTotalCartPrice(order.getTotalCartPrice());
        newOrder.setShippingInfo(order.getShippingInfo());
        orderRepository.save(newOrder);

        return "Order added successfully";

    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    public String deleteOrderById(String orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order!=null) {
            orderRepository.delete(order);
            return "Order deleted successfully";
        } else {
            return "Order Id not found";
        }
    }
    public int getTotalOrders() {
        return orderRepository.findOrdersCount();
    }

}
