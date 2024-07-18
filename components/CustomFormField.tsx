"use client";

import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'; // Importing the default styles for the phone number input.

interface CustomProps {
  control: Control<any>; // This helps to manage the form state.
  fieldType: FormFieldType; // This tells what kind of input it is, like text input or phone number input.
  name: string; // The name of the form field.
  label?: string; // The label that appears above the form field.
  placeholder?: string; // Placeholder text inside the form field.
  description?: string; // Description text under the form field.
  iconSrc?: string; // The source URL for an icon to show next to the form field.
  iconAlt?: string; // Alternative text for the icon.
  disabled?: boolean; // Whether the form field is disabled.
  dateFormat?: string; // Format for date input, if used.
  showTimeSelect?: boolean; // Whether to show time selection, if used.
  children?: React.ReactNode; // Any child elements.
  renderSkeleton?: (field: any) => React.ReactNode; // Function to render a loading skeleton.
}

// This function decides how to display the field based on its type.
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt = "", placeholder } = props; // Destructure properties from props and provide default values.
  
  // Check the type of the form field
  switch (fieldType) {
    case FormFieldType.INPUT: // If it's a regular input field
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {/* If there's an icon, display it next to the input field */}
          {props.iconSrc && (
            <Image
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field} // Spread the field properties onto the input
              className="shad-input border-0" // Apply styles
            />
          </FormControl>
        </div>
      );
    
    case FormFieldType.PHONE_INPUT: // If it's a phone number input field
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US" // Default country for phone number
            placeholder={props.placeholder} // Placeholder text inside the phone input
            international // Allow international phone numbers
            withCountryCallingCode // Show country calling code
            value={field.value as string | undefined} // Set the value of the phone input
            onChange={field.onChange} // Update the value when changed
            className="input-phone" // Apply styles
          />
        </FormControl>
      );
    default: // If the field type is not recognized, do nothing
  }
};

// This is the main form field component that uses the RenderField function to display different types of fields.
const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control} // Pass the control object to manage form state
      name={name} // Pass the name of the form field
      render={({ field }) => (
        <FormItem className="flex-1">
          {/* If the field is not a checkbox and has a label, display the label */}
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} /> {/* Render the appropriate field */}
          <FormMessage className="shad-error" /> {/* Display error messages if any */}
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
