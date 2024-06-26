import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type Props = {
    src: string;
    className?: string;
    alt?: string;
}

const Img = ({ src, className,alt }: Props) => {
    return (
        <LazyLoadImage
            className={className || ""}
            alt={alt || ""}
            effect="blur"
            src={`${src}`}
        />
    );
};

export default Img;