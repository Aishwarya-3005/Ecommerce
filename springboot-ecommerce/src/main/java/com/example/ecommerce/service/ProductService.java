package com.example.ecommerce.service;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;


@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    // Path to store images
    @Value("${images.path}")
    private String imageDirectoryPath;

    private final String uploadPath = "/home/aishwaryarupaji/images"; // Replace with your image storage path
    public String addProduct(Product product, MultipartFile image) throws IOException {
            if (image != null && !image.isEmpty()) {
                String imageURL = createImageURL(image);    // imageUrl is the path where image is stored
                product.setImageURL(imageURL);
            }
            productRepository.save(product);
            return "Product added successfully";
    }
    // Create image URL
    private String createImageURL(MultipartFile image) throws IOException {
        Path directoryPath = Paths.get(imageDirectoryPath);    // Path to store images
        Files.createDirectories(directoryPath);         // Create directories if not exists

        String imageName = System.currentTimeMillis() + "-" + image.getOriginalFilename();
        Path imagePath = directoryPath.resolve(imageName);  // imagePath holds the complete path where image is stored
        // Copy image to the imagePath & replace if already exists
        Files.copy(image.getInputStream(), imagePath, REPLACE_EXISTING);
        return imageName;
    }

    public List<Product> getAllProducts() {
      return productRepository.findAll();
    }
    public String deleteProduct(String id) throws IOException {
        Product prod=productRepository.findById(id).orElse(null);
        if(prod!=null) {
            String path = imageDirectoryPath + prod.getImageURL();
            Path imagePath = Paths.get(path);
            if (Files.exists(imagePath)) {
                Files.delete(imagePath);
            }
            productRepository.deleteById(id);
            return "Product Deleted";
        } else {
            return "Product ID: " + id + "is not found";
        }
    }
    public int countProduct() {
        return productRepository.countProduct();
    }
}
