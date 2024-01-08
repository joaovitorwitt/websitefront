import { useRouter } from "next/navigation";
import { useState } from "react";
import jsonp from "jsonp";
import Image from "next/image";

interface NewsletterData {
  email: string;
}

export default function NewsletterForm() {
  const router = useRouter();

  const [newsletterData, setNewsletterData] = useState<NewsletterData>({
    email: "",
  });

  const [email, setEmail] = useState("");

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url =
      "https://joaovitorwitt.us21.list-manage.com/subscribe/post?u=4283f06241e2e74cd770cc67e&amp;id=d62d0da44e&amp;f_id=007dd9e6f0";
    jsonp(`${url}&EMAIL=${email}`, { param: "c" }, (_, data) => {
      console.log("data", data);
      const { msg } = data;
      console.log(msg);
    });
    router.push("/thankyou");
  };

  const handleNewsletterInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setNewsletterData((prevData) => ({ ...prevData, email: value }));
  };

  const handleNewsletterForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(`Form submitted: ${JSON.stringify(newsletterData)}`);

    router.push("/thankyou");
  };

  return (
    <form onSubmit={onSubmitForm} className="newsletter-form">
      <div style={{ display: "none" }}>
        <input type="hidden" name="meta_web_form_id" value="772737528" />
        <input type="hidden" name="meta_split_id" value="" />
        <input type="hidden" name="listname" value="awlist6609873" />
        <input
          type="hidden"
          name="redirect"
          value="https://joaovitorwitt.com/thanks"
          id="redirect_10f1d8217bdab3c638a73541f0499adf"
        />
        <input
          type="hidden"
          name="meta_redirect_onlist"
          value="https://joaovitorwitt.com/newsletter"
        />
        <input type="hidden" name="meta_adtracking" value="My_Web_Form" />
        <input type="hidden" name="meta_message" value="1" />
        <input type="hidden" name="meta_required" value="email" />

        <input type="hidden" name="meta_tooltip" value="email||Email Address" />
      </div>

      <input
        className="email"
        id="awf_field-116178738"
        type="text"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        tabIndex={500}
        autoComplete="off"
        placeholder="Email Address"
      />

      <input
        name="submit"
        className="newsletter-btn"
        type="submit"
        value="Subscribe"
        tabIndex={501}
      />

      <div style={{ display: "none" }}>
        <Image
          src="https://forms.aweber.com/form/displays.htm?id=7OxM7MzsrEwc"
          alt=""
          width={0}
          height={0}
        />
      </div>
    </form>
  );
}
