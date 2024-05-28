package com.example.ecommerce.controller;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/products")
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String addProduct(@RequestParam("productName") String productName,
                             @RequestParam("category") String category,
                             @RequestParam("description") String description,
                             @RequestParam("price") double price,
                             @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        Product product = new Product();
        product.setProductName(productName);
        product.setCategory(category);
        product.setDescription(description);
        product.setPrice(price);
        return productService.addProduct(product, image);
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    @DeleteMapping("/{productId}")
    public String deleteProduct(@PathVariable String productId) throws IOException {
        return productService.deleteProduct(productId);
    }
    @GetMapping("/productsCount")
    public int countProduct() {
        return productService.countProduct();
    }
}
