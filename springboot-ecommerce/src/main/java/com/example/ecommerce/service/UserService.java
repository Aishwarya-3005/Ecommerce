package com.example.ecommerce.service;

import com.example.ecommerce.model.Address;
import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public String addUser(User user) {
        User newUser = new User();
        newUser.setUserName(user.getUserName());
        newUser.setEmail(user.getEmail());
        newUser.setPhoneNumber(user.getPhoneNumber());
        newUser.setAddressList(new ArrayList<>());
        userRepository.save(newUser);
        return "User added successfully";
    }
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String userId) {
        return userRepository.findById(userId).orElse(null);
    }


    public List<Address> getAddressListByUserId(String userId) {
        User user = getUserById(userId);
        if (user != null) {
            return user.getAddressList();
        }
        return null;
    }

    public String updateUserAddressList(String userId, List<Address> addressList) {
        User user = getUserById(userId);
        if (user != null) {
            user.setAddressList(addressList);
            userRepository.save(user);
            return "Address updated";
        } else {
            return "User Id not found";
        }
    }

    public int countUser(){
        return userRepository.countUser();
    }

    public String deleteAddressByUserId(String userId, String addressId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            List<Address> addressList = user.getAddressList();
            for (Address eachAddress : addressList) {
                if (eachAddress.getAddressId().equals(addressId)) {
                    addressList.remove(eachAddress);
                    updateUserAddressList(userId, addressList);
                    return "Address deleted";
                }
            }
            return "Address Id not found";
        } else {
            return "User id not found";
        }
    }
}
