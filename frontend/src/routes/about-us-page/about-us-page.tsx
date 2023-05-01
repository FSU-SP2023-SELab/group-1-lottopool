import { Component } from "solid-js";

const AboutUsPage: Component = () => {
  return (
    <div class="max-w-3xl mx-auto py-3 px-4 min-h-[calc(100vh-5rem-72px)]">
      <h1 class="text-4xl text-primary font-bold mb-8">About Us</h1>

      <p class="mb-8">
        Welcome to Lottopool, your one-stop platform for lottery pooling that increases your chances
        of winning big! We are a team of five dedicated and passionate college computer science
        students with diverse skillsets, driven by the desire to create a unique, user-friendly
        platform that brings people together for a common goal – winning the lottery.
      </p>

      <h2 class="text-3xl text-primary font-bold mb-8">Meet the Team:</h2>

      <ol>
        <li>
          <strong>Andrew Augustine (Project Manager/Backend Developer)</strong>
          <p class="mb-5">
            A natural leader with a strong background in computer science, Andrew oversees the
            project and ensures seamless communication between team members. He is responsible for
            developing the backend infrastructure that powers Lottopool's robust features.
          </p>
        </li>

        <li>
          <strong>Anthony Ingle (Frontend Developer)</strong>
          <p class="mb-5">
            With a keen eye for design and user experience, Anthony crafts the engaging and
            intuitive user interface that makes Lottopool a pleasure to use. He ensures that the
            platform is not only visually appealing but also highly functional, providing users with
            a seamless experience.
          </p>
        </li>

        <li>
          <strong>Tristan Morris (Stripe Integration Specialist)</strong>
          <p class="mb-5">
            Tristan specializes in payment processing and is responsible for integrating Stripe into
            Lottopool. He ensures that all transactions on the platform are secure and seamless,
            providing users with a hassle-free and enjoyable experience.
          </p>
        </li>

        <li>
          <strong>Cole Warren (Auth0 Integration Specialist)</strong>
          <p class="mb-5">
            Cole is an expert in authentication and security, integrating Auth0 into Lottopool to
            ensure user data protection and privacy. His work allows users to trust that their
            information is safe and secure on our platform.
          </p>
        </li>

        <li>
          <strong>Dawson Stoller (SQL/Backend Developer)</strong>
          <p class="mb-8">
            A database wizard, Dawson plays a crucial role in managing and optimizing the SQL
            backend that supports Lottopool's platform. His expertise ensures that the platform runs
            smoothly and efficiently, providing users with a reliable service.
          </p>
        </li>
      </ol>

      <h2 class="text-3xl text-primary font-bold mb-8">Our Motivation:</h2>

      <p class="mb-5">
        Lottopool was born from the belief that our unique idea has the potential to become
        something more than just a college project. We were inspired to create a platform that not
        only challenges our skills but also tests our ability to communicate effectively with one
        another.
      </p>

      <p class="mb-5">
        After researching existing lottery pooling platforms, we found that while a few have had
        some success, they never managed to gain attention. We believe that Lottopool can change
        this by bringing a fresh and innovative approach to the lottery pooling space.
      </p>

      <p class="mb-8">
        Join us on this exciting journey as we strive to make Lottopool a reality and revolutionize
        the way people participate in lotteries. Together, let's dream big and win even bigger!
      </p>
    </div>
  );
};
export default AboutUsPage;
