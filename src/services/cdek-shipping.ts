import {
    AbstractFulfillmentService,
    Cart,
    Fulfillment,
    LineItem,
    Order,
} from "@medusajs/medusa";
import { CreateReturnType } from "@medusajs/medusa/dist/types/fulfillment-provider";
import { Cdek_sdk, Login } from "./cdek-shipping/index"
import { TariffList } from "./cdek-shipping/interface/requestData"

class CdekShipping extends AbstractFulfillmentService {
    static identifier: string = "cdek-shipping";
    private cdek: Cdek_sdk
    private token: any
    private cdek_login: Login
    private from_location: string

    constructor(container, options) {
        super(container)
        this.cdek = new Cdek_sdk()
        this.cdek_login = {
            account: options.account,
            secret: options.secret,
        };
        this.from_location = options.from_location
    }

    async initialize() {
        this.token = await this.cdek.getToken(this.cdek_login);
    }

    async validateFulfillmentData(
        optionData: { [x: string]: unknown },
        data: { [x: string]: unknown },
        cart: Cart
    ): Promise<Record<string, unknown>> {
        console.log("Validate Data: ", data)
        // if (data.id !== this.getIdentifier()) {
        //     console.log("optionData: ", optionData)
        //     console.log("getID: ", this.getIdentifier())
        //     console.log("data: ", data)
        //     console.log("cart: ", cart)
        //     throw new Error("invalid data")
        // }

        return {
            ...data,
        }
    }

    async validateOption(data: { [x: string]: unknown }): Promise<boolean> {
        console.log("validate Data: ", data)
        return data.id == "cdek-shipping"
    }

    async canCalculate(data: { [x: string]: unknown }): Promise<boolean> {
        console.log("calcData: ", data)
        return data.id === "cdek-shipping"
    }

    async calculatePrice(
        optionData: { [x: string]: unknown },
        data: { [x: string]: unknown },
        cart: Cart
    ): Promise<number> {
        await this.initialize()
        // console.log("optionData: ", optionData)
        // console.log("Data: ", data)
        // console.log("cart: ", cart)
        const calcData: TariffList = {
            from_location: { address: this.from_location },
            to_location: { address: cart.shipping_address.address_1 },
            packages: cart.items.map(item => ({
                weight: item.variant.weight * item.quantity,
                height: item.variant.height,
                length: item.variant.length,
                width: item.variant.width,
            }))
        }
        console.log("calcData: ", calcData)
        const price = await this.cdek.calculateOnTariffList(this.token, calcData)
        return price.data.tariff_codes[0].delivery_sum * 100
    }

    async createFulfillment(
        data: { [x: string]: unknown },
        items: LineItem[],
        order: Order,
        fulfillment: Fulfillment
    ): Promise<{ [x: string]: unknown }> {
        return {
            ...data
        }
        // throw new Error("Method not implemented.");
    }

    async cancelFulfillment(fulfillment: { [x: string]: unknown }): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async createReturn(
        returnOrder: CreateReturnType
    ): Promise<Record<string, unknown>> {
        throw new Error("Method not implemented.");
    }

    async getFulfillmentDocuments(data: { [x: string]: unknown }): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getReturnDocuments(data: Record<string, unknown>): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getShipmentDocuments(data: Record<string, unknown>): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async retrieveDocuments(
        fulfillmentData: Record<string, unknown>,
        documentType: "invoice" | "label"
    ): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async getFulfillmentOptions(): Promise<any[]> {
        return [
            {
                id: "cdek-shipping",
            },
        ];
    }
}

export default CdekShipping;
