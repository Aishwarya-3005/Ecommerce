package com.example.ecommerce.model;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

@Document("Product")
public class Product {
    @Id
    private String productId;
    private String productName;
    private String category;
    private String description;
    private double price;
    private String imageURL;
}
