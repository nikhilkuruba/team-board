import { createServer, Model, Response } from "miragejs";

let server: any;

export function makeServer() {
  if (server) {
    return server;
  }

  server = createServer({
    models: {
      employee: Model,
    },

    seeds(server) {
      server.create("employee", {
        id: "1",
        name: "Mark Hill",
        designation: "CEO",
        team: "",
        manager: null,
      });

      server.create("employee", {
        id: "2",
        name: "Bob",
        designation: "CTO",
        team: "Engineering",
        manager: "1",
      });
      server.create("employee", {
        id: "3",
        name: "Eva",
        designation: "Support Manager",
        team: "Tech Support",
        manager: "1",
      });
      server.create("employee", {
        id: "4",
        name: "Grace",
        designation: "Marketing Manager",
        team: "Marketing",
        manager: "1",
      });
      server.create("employee", {
        id: "5",
        name: "Linda May",
        designation: "Sales Manager",
        team: "Sales",
        manager: "1",
      });
      server.create("employee", {
        id: "6",
        name: "John Green",
        designation: "Chief accountant",
        team: "Accounting",
        manager: "1",
      });

      server.create("employee", {
        id: "7",
        name: "Charlie",
        designation: "Development manager",
        team: "Engineering",
        manager: "2",
      });

      server.create("employee", {
        id: "8",
        name: "David",
        designation: "Lead developer",
        team: "Engineering",
        manager: "7",
      });
      server.create("employee", {
        id: "9",
        name: "Hannah",
        designation: "Lead developer",
        team: "Engineering",
        manager: "7",
      });

      server.create("employee", {
        id: "10",
        name: "Frank",
        designation: "Software Developer",
        team: "Engineering",
        manager: "8",
      });
      server.create("employee", {
        id: "11",
        name: "Ron",
        designation: "Software Developer",
        team: "Engineering",
        manager: "9",
      });

      server.create("employee", {
        id: "12",
        name: "Alice",
        designation: "Service Representative",
        team: "Tech Support",
        manager: "3",
      });

      server.create("employee", {
        id: "13",
        name: "Mary",
        designation: "Marketing analyst",
        team: "Marketing",
        manager: "4",
      });
      server.create("employee", {
        id: "14",
        name: "kirk",
        designation: "Marketing analyst",
        team: "Marketing",
        manager: "4",
      });

      server.create("employee", {
        id: "15",
        name: "Micheal",
        designation: "Sales Representative",
        team: "Sales",
        manager: "5",
      });
      server.create("employee", {
        id: "16",
        name: "Peter",
        designation: "Sales Representative",
        team: "Sales",
        manager: "5",
      });

      server.create("employee", {
        id: "17",
        name: "glenn",
        designation: "Accountant",
        team: "Accounting",
        manager: "6",
      });
      server.create("employee", {
        id: "18",
        name: "Rick",
        designation: "Accountant",
        team: "Accounting",
        manager: "6",
      });
    },

    routes() {
      this.namespace = "api";
      this.get("/employees", (schema) => {
        return schema.all("employee");
      });

      this.post("/employees/:id/manager", (schema, request) => {
        const id = request.params.id;
        const { newManagerId } = JSON.parse(request.requestBody);

        const employee = schema.employees.find(id);
        const newManager = schema.employees.find(newManagerId);
        if (employee && newManager) {
          employee.update({ manager: newManagerId, team: newManager.team });         
          return { success: true, employee };
        } else {
          return new Response(404, {}, { error: "Employee data not found" });
        }
      });
    },
  });
  return server;
}
