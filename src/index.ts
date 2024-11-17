import { z } from "zod";
//z es un objeto de zod que nos permite validar datos

//definir que es lo que esperamos, luego comparar lo que estamos recibiendo con lo que esperamos

const UserSchema = z.object({
	email: z.string().email(),
	fullName: z.string(),
	phone: z.number(),
});

//Type Inference functionality
//use the type of UserSchema to infer the type of UserType and not have to write it again, with this the validation happens in the compiler also
type UserType = z.infer<typeof UserSchema>;

const UserInput: UserType = {
	email: "tes@test.com",
	fullName: "test",
	phone: 23423,
};

const result = UserSchema.parse(UserInput);

console.log(result);

//Schema Composition
const addressSchema = z.object({
	street: z.string(),
	city: z.string(),
});
type AddressType = z.infer<typeof addressSchema>;

const addressInput: AddressType = {
	city: "Street",
	street: "test 1",
};

const result2 = addressSchema.parse(addressInput);
console.log(result2);
