import customerModel from "./customerModel";
import { Customer } from "./customerTypes";

export class CustomerService {
  async findOne(id: string) {
    return await customerModel.findOne({ userId: id });
  }

  async create(customer: Customer) {
    return await customerModel.create(customer);
  }

  async addAddress(customerId: string, userId: string, address: string) {
    return await customerModel.findOneAndUpdate(
      {
        _id: customerId,
        userId,
      },
      {
        $push: {
          addresses: {
            text: address,
            isDefault: false,
          },
        },
      },
      {
        new: true,
      },
    );
  }
}
