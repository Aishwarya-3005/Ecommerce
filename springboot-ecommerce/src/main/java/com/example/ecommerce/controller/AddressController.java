package com.example.ecommerce.controller;

import com.example.ecommerce.model.Address;
import com.example.ecommerce.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/address")
public class AddressController {
    @Autowired
    private AddressService addressService;

    @GetMapping
    public List<Address> getAddresses() {
        return addressService.getAddresses();
    }

    @PostMapping("/{userId}")
    public String addAddressByUserId(@RequestBody Address address, @PathVariable String userId) {
        return addressService.addAddressByUserId(address, userId);
    }

    @DeleteMapping("/{userId}/{addressId}")
    public String deleteAddressByUserId(@PathVariable String userId, @PathVariable String addressId) {
        return addressService.deleteAddressByUserId(userId, addressId);
    }
}
