// Directive "use client" allows this file to be used for client-side rendering
"use client";

// Import necessary modules and components
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver for integrating Zod with react-hook-form
import { useForm } from "react-hook-form"; // Library for managing forms in React
import { z } from "zod"; // Library for schema validation

import { Button } from "../ui/button"; // Button component
import { Form } from "../ui/form"; // Form component

import CustomFormField from "../CustomFormField"; // Custom form field component
import SubmitButton from "../SubmitButton"; // Submit button component
import { useState } from "react"; // State hook for managing component state
import { UserFormValidation } from "@/lib/validation"; // Validation schema for user form
import { useRouter } from "next/navigation"; // Router hook for navigation

// Enum for different types of form fields
export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

// Define the PatientForm component
const PatientForm = () => {
  const Router = useRouter(); // Router hook instance for navigation

  const [isLoading, setIsLoading] = useState(false); // State variable to manage loading state

  // 1. Define your form using useForm hook from react-hook-form and zodResolver for validation
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation), // Integrate Zod for form validation
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler function
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true); // Set loading state to true

    try {
      // Placeholder for API call to create user
      // const userData = {
      //   name,
      //   email,
      //   phone,
      // };
      
      // Placeholder for actual API call
      // const user = await createUser(userData);

      // Placeholder for redirecting to user-specific page upon successful user creation
      // if (user) Router.push(`/patients/${user.id}/register`);
      // console.log("User created successfully:", user);
    } catch (error) {
      console.error(error); // Log any errors that occur during the API call
    }
  }

  // Return the form JSX
  return (
    // Wrap the form in the Form component for consistent styling and behavior
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome 👋 </h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>

        {/* Full Name Field */}
        <CustomFormField
          fieldType={FormFieldType.INPUT} // Specify the type of form field
          control={form.control} // Pass the form control
          name="name" // Set the name for the form field
          label="Full name" // Set the label for the form field
          placeholder="John Doe" // Set the placeholder for the form field
          description="This is your public display name." // Set the description for the form field
          iconSrc="/assets/icons/user.svg" // Set the icon source for the form field
          iconAlt="User icon" // Set the alt text for the icon
        />

        {/* Email Field */}
        <CustomFormField
          fieldType={FormFieldType.INPUT} // Specify the type of form field
          control={form.control} // Pass the form control
          name="email" // Set the name for the form field
          label="Email" // Set the label for the form field
          placeholder="example@domain.com" // Set the placeholder for the form field
          iconSrc="/assets/icons/email.svg" // Set the icon source for the form field
          iconAlt="Email icon" // Set the alt text for the icon
        />

        {/* Phone Number Field */}
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT} // Specify the type of form field
          control={form.control} // Pass the form control
          name="phone" // Set the name for the form field
          label="Phone number" // Set the label for the form field
          placeholder="(555) 123-4567" // Set the placeholder for the form field
        />

        {/* Submit Button */}
        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  );
};

// Export the PatientForm component as the default export of this module
export default PatientForm;
