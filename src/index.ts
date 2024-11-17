import { optional, z } from "zod";
//z es un objeto de zod que nos permite validar datos

//definir que es lo que esperamos, luego comparar lo que estamos recibiendo con lo que esperamos

const UserSchema = z.object({
	email: z.string().email(),
	fullName: z.string(),
	phone: z.number(),
});

//* Type Inference functionality
//use the type of UserSchema to infer the type of UserType and not have to write it again, with this the validation happens in the compiler also
type UserType = z.infer<typeof UserSchema>;

const UserInput: UserType = {
	email: "tes@test.com",
	fullName: "test",
	phone: 23423,
};

const result = UserSchema.parse(UserInput);

// console.log(result);

//* Schema Composition
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
// console.log(result2);

//* Combining schemas with "merge"
//you can combine schemas to create more complex schemas

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
// console.log(result3);

//* SafeParse
// SafeParse is a safer alternative to parse, as it does not throw an error to crash the server if the value is invalid, but instead returns a Result object that contains the parsed value or an error message on json format

const StringSchema = z.string();

const result4 = StringSchema.safeParse(true);
console.log(result4); //success: false, error: [Getter] 🔴

const result5 = StringSchema.safeParse("test");
console.log(result5); //success: true, value: "test" 🟢

//* Arrays
//for validate arrays in zod you can use z.array method

const NumbersArraySchema = z.array(z.number());

type NumbersArrayType = z.infer<typeof NumbersArraySchema>;

const result6 = NumbersArraySchema.parse([1, 2, 3]);
console.log(result6); //success: false, error: [Getter] 🔴

//Arrays of objects
const PersonSchema = z.object({
	name: z.string(),
	age: z.number(),
});

const PersonsArraySchema = z.array(PersonSchema);
//PersonsArraySchema es un array de PersonSchema

// type PersonsArrayType = z.infer<typeof PersonsArraySchema>;

const PersonsInput = [
	{
		name: "Ryan Ray",
		age: 31,
	},
	{
		name: "John Doe",
		age: 34,
	},
];

const result7 = PersonsArraySchema.parse(PersonsInput);
console.log(result7); //success: true, value: [Array] 🟢

//Others ways to validate arrays
//the methods order matters in the type definition
const s1 = z.string().optional().array(); // LOS STRINGS SON OPCIONALES (pueden haber elementos undefined)
const s2 = z.string().array().optional(); // EL ARREGLO ES OPCIONAL

type s1Type = z.infer<typeof s1>;
type s2Type = z.infer<typeof s2>;

const s1Input: s1Type = ["test", undefined]; //"(string | undefined)[]" => s1Input es un array que puede contener elementos strings o undefined
console.log(s1.parse(s1Input));

const s2Input: s2Type = ["test"]; //"string[] | undefined" => s2Input puede ser un array de strings[] o ser undefined
console.log(s2.parse(s2Input));
