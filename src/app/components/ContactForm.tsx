import FormInput from "./FormInput";
import emailjs from "@emailjs/browser";
import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: "",
    email: "",
    message: "",
  });

  function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  }

  async function handleContactForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors: FormErrors = {
      name: formData.name ? "" : "Name is required",
      email: formData.email
        ? validateEmail(formData.email)
          ? ""
          : "Invalid email"
        : "Email is required",
      message: formData.message ? "" : "Message is required",
    };

    setFormErrors(newErrors);

    // if there are no errors, submit the form
    if (Object.values(newErrors).every((error) => error === "")) {
      // send email using Emailjs
      try {
        await emailjs.send(
          "service_xn1h6gg",
          "template_vyuqux5",
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          "TmEXwwcTa2EpTjKpw"
        );
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        // TODO -- redirect the user to another page
        console.log("email send ");
        router.push("/thanks");
      } catch (error) {
        console.log(`Error sending email: ${error}`);
      }
    }
  }
  return (
    <form
      ref={form}
      onSubmit={handleContactForm}
      action=""
      className="contact-form"
      method="post"
    >
      <div className="input-group">
        <div className="input">
          <FormInput
            type={"text"}
            autocomplete={"off"}
            id={"name"}
            value={formData.name}
            action={handleInputChange}
            classname={"stuff"}
          />

          <label htmlFor="name" className="input-label">
            Name <span className="required-field">*</span>
          </label>
          <div className="error-message">{formErrors.name}</div>
        </div>

        <div className="input">
          <FormInput
            type={"text"}
            autocomplete={"off"}
            id={"email"}
            value={formData.email}
            action={handleInputChange}
            classname={"stuff"}
          />
          <label htmlFor="email" className="input-label">
            Email <span className="required-field">*</span>
          </label>
          <div className="error-message">{formErrors.email}</div>
        </div>
      </div>

      <div className="input">
        <FormInput
          type={"text"}
          id={"message"}
          autocomplete={"off"}
          value={formData.message}
          action={handleInputChange}
          classname={"stuff"}
        />
        <label htmlFor="message" className="input-label">
          Message<span className="required-field">*</span>
        </label>
        <div className="error-message">{formErrors.message}</div>
      </div>

      <button type="submit" className="button form-button button-fill">
        Send Message
      </button>
    </form>
  );
}
