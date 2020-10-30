import { createContext } from "react";
import LinkService from "../../service/LinkService";

const ServiceContext = createContext<LinkService | null>(null);

export default ServiceContext;
