package com.example.ecommerce.controller;

import com.example.ecommerce.model.Address;
import com.example.ecommerce.model.User;
import com.example.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")

public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public String addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable String userId) {
        return userService.getUserById(userId);
    }

    @PatchMapping
    public String updateUserAddressList(String userId, List<Address> addressList) {
        return userService.updateUserAddressList(userId, addressList);
    }
    @GetMapping("/addressList/{userId}")
    public List<Address> getAddressListByUserId(@PathVariable String userId) {
        return userService.getAddressListByUserId(userId);
    }
    @DeleteMapping("/{userId}/{addressId}")
    public String deleteAddressByUserId(@PathVariable String userId, @PathVariable String addressId) {
        return userService.deleteAddressByUserId(userId, addressId);
    }

    @GetMapping("/usersCount")
    public int countUsers(){
        return userService.countUser();
    }
}
