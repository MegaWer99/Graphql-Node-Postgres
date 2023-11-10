import {gql} from 'apollo-server'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const empleados = [
	{
		idcliente: 1,
		nombre: "Juan Sebastian",
		apellidopaterno: "Narvaez",
		apellidomaterno: "Werminski",
		edad: "24",
		fechanacimiento: "1999-09-13",
		telefono: "3124489453",
		ciudad: "barranquilla"
	},
	{
		idcliente: 4,
		nombre: "Camilo",
		apellidopaterno: "Dominges",
		apellidomaterno: "Mendoza",
		edad: "18",
		fechanacimiento: "2005-12-24",
		telefono: "312569589",
		ciudad: "Cali"
	},
	{
		idcliente: 2,
		nombre: "Mateo",
		apellidopaterno: "Zuñiga",
		apellidomaterno: "Hernandez",
		edad: "20",
		fechanacimiento: "2003-02-27",
		telefono: "1234567892",
		ciudad: "Medellin"
	}
]

const typedefs = gql`
type empleado{
	idcliente: ID!
	nombre: String!
	apellidomaterno: String!
	apellidopaterno: String!
	edad: String!
	fechanacimiento: String!
	telefono: String!
	ciudad: String!
}

type Query{
	EmpleadoCount: Int!
	AllEmpleados: [empleado]!
	FindEmpleados (nombre: String!): empleado
}
` 

const resolvers = {

	Query:{
	EmpleadoCount: () => empleados.length,
	AllEmpleados: () => empleados,
	FindEmpleados: (root, args) => {
		const {nombre} = args
		return empleados.find(empleado => empleado.nombre == nombre)
	}
	}
}

const server = new ApolloServer({
	typeDefs: typedefs,
	resolvers
})

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);