package com.example.ecommerce.controller;

import com.example.ecommerce.model.Order;
import com.example.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public String addOrder(@RequestBody Order order) {
        return orderService.addOrder(order);
    }
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
    @DeleteMapping("/{orderId}")
    public String deleteOrderById(@PathVariable String orderId) {
        return orderService.deleteOrderById(orderId);
    }
    @GetMapping("/ordersCount")
    public int getTotalOrders() {
        return orderService.getTotalOrders();
    }
}
