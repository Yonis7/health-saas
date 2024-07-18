// "use client" directive allows this file to be compiled as a module and makes it client-side rendering
"use client";

// Importing necessary modules and components from various libraries
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver for integrating Zod with react-hook-form
import { useForm } from "react-hook-form"; // Library for managing forms in React
import { z } from "zod"; // Library for schema validation

import { Button } from "../ui/button"; // Button component
import { Form } from "../ui/form"; // Form component

import CustomFormField from "../CustomFormField"; // Custom form field component

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

// Define a schema for form validation using Zod
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

// Define the PatientForm component
const PatientForm = () => {
  // 1. Define your form using useForm hook from react-hook-form and zodResolver for validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // Integrate Zod for form validation
    defaultValues: {
      username: "", // Set default value for username
    },
  });

  // 2. Define a submit handler function
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values
    // ✅ This will be type-safe and validated
    console.log(values); // Log form values to the console
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
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

// Export the PatientForm component as the default export of this module
export default PatientForm;
