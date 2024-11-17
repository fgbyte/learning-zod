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
const AddressSchema = z.object({
	street: z.string(),
	city: z.string(),
});
type AddressType = z.infer<typeof AddressSchema>;

const addressInput: AddressType = {
	city: "Street",
	street: "test 1",
};

const result2 = AddressSchema.parse(addressInput);
console.log(result2);

//Combining schemas, you can combine schemas to create more complex schemas

const CitizenSchema = UserSchema.merge(AddressSchema);

type CitizenType = z.infer<typeof CitizenSchema>;

const citizenInput: CitizenType = {
	email: "tes@test.com",
	fullName: "test",
	phone: 23423,
	street: "test 1",
	city: "Street",
};

const result3 = CitizenSchema.parse(citizenInput);
console.log(result3);
