import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="center">
          <p style={{fontSize: "20px"}}>Welcome to bCard WebSite, the ultimate platform for businesses to showcase their expertise, connect with potential customers, and thrive in today's competitive marketplace. We're here to revolutionize the way businesses connect with their target audience, making it easier than ever for customers to discover and engage with the services they need.</p><br />
          <p style={{fontSize: "20px"}}>  
          At bCard WebSite, we understand the challenges businesses face when it comes to marketing and finding new clients. That's why we've created a seamless and user-friendly platform that allows businesses to showcase their unique offerings and connect with a vast network of potential customers. We believe that every business deserves a chance to shine, regardless of size or industry.</p><br />
          <p style={{fontSize: "20px"}}>  
          By joining our platform, businesses gain access to a dynamic and interactive online community. Our robust search and filtering tools make it effortless for users to find the services they require, ensuring that businesses receive the visibility they deserve. With a simple and intuitive signup process, businesses can quickly create a comprehensive profile that highlights their expertise, showcases their portfolio, and communicates their unique selling points.</p><br />
          <p style={{fontSize: "20px"}}>  
          We're committed to providing a secure and trustworthy environment for businesses and customers alike. Our verification and review systems ensure that only credible and reliable businesses are featured on our platform, giving customers peace of mind when making their choices. We also encourage open communication and feedback, allowing businesses to build trust and strengthen their reputation.</p><br />
          <p style={{fontSize: "20px"}}>  
          At bCard WebSite, we believe that connections are the foundation of success. That's why we provide a range of communication tools, making it easy for businesses and customers to engage, collaborate, and build long-lasting relationships. From direct messaging to appointment scheduling, we've got everything you need to streamline your interactions and take your business to the next level.</p><br />
          <p style={{fontSize: "20px"}}>  
          We're passionate about supporting businesses and fostering growth. Our team is dedicated to continuously enhancing our platform, introducing new features, and staying ahead of the latest industry trends. We invite you to join us on this exciting journey, where businesses thrive, connections flourish, and opportunities abound.</p><br />
          <p style={{fontSize: "20px"}}>  
          Together, let's unleash the full potential of your business! Sign up with bCard WebSite today and take the first step towards unlocking a world of endless possibilities.</p>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
          }}>
          <img src="/assets/images/card.jpg" alt="card" width="100%" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
