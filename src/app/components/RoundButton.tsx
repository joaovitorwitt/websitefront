import Link from "next/link";
import "../assets/css/components/roundbutton.modules.css";

export default function RoundButton({ url, buttonText }: any) {
  return (
    <Link href={url} className="large-button button-fill">
      {buttonText}
    </Link>
  );
}
