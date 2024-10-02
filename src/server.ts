import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import route from "./routes/route";

const app = express();
dotenv.config();
app.use(express.json());
app.use(route);
const prisma = new PrismaClient();

// app.post("/payments", async (req: Request, res: Response) => {
//   try {
//     const {
//       store,
//       nameEmployee,
//       salary,
//       salaryTotal,
//       datePayment = "",
//       overTime = "",
//       advanceMoney = "",
//       cardLoan = "",
//       discounts = "",
//     } = req.body;

//     const payment: PaymentProps = await prisma.payment.create({
//       data: {
//         nameEmployee: nameEmployee ?? "",
//         salary: Number(salary) ?? 0,
//         store: store ?? "",
//         salaryTotal: salaryTotal ?? "",
//         datePayment: datePayment ?? "",
//         overTime: overTime ?? "",
//         advanceMoney: advanceMoney ?? "",
//         cardLoan: cardLoan ?? "",
//         discounts: discounts ?? "",
//       } as PaymentProps,
//     });

//     res.status(201).json({ message: "Pagamento criado com sucesso!", payment });
//   } catch (error) {
//     console.log("Erro ao criar o pagamento /payments", error);
//     res.status(500).json({ error: "Erro ao criar o pagamento" });
//   }
// });

// app.get("/payments", async (req: Request, res: Response) => {
//   try {
//     const payments = await prisma.payment.findMany();
//     res.status(200).json({ payments });
//   } catch (error) {
//     console.log("Erro ao buscar os pagamentos /payments", error);
//     res.status(500).json({ error: "Erro ao buscar os pagamentos" });
//   }
// });

app.get("/payments/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payment = await prisma.payment.findUnique({
      where: { id: id },
    });

    {
      !payment && res.status(404).json({ error: "Pagamento não encontrado" });
    }

    res.status(200).json({ payment });
  } catch (error) {
    console.log("Erro ao buscar o pagamento /payments/:id", error);
    res.status(500).json({ error: "Erro ao buscar o pagamento" });
  }
});

app.put("/payments/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      nameEmployee,
      salaryTotal,
      salary,
      store,
      datePayment,
      overTime,
      advanceMoney,
      cardLoan,
      discounts,
    } = req.body;
    const payment = await prisma.payment.update({
      where: { id: id },
      data: {
        nameEmployee: nameEmployee ?? "",
        salary: Number(salary) ?? 0,
        store: store ?? "",
        datePayment: datePayment ?? new Date(),
        salaryTotal: salaryTotal ?? "",
        overTime: overTime ?? "",
        advanceMoney: advanceMoney ?? "",
        cardLoan: cardLoan ?? "",
        discounts: discounts ?? "",
      },
    });

    res
      .status(200)
      .json({ message: "Pagamento atualizado com sucesso!", payment });
  } catch (error) {
    console.log("Erro ao atualizar o pagamento /payments/:id", error);
    res.status(500).json({ error: "Erro ao atualizar o pagamento" });
  }
});

app.delete("/payments/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payment = await prisma.payment.delete({
      where: { id: id },
    });
    res
      .status(200)
      .json({ message: "Pagamento excluido com sucesso!", payment });
  } catch (error) {
    console.log("Erro ao excluir o pagamento /payments/:id", error);
    res.status(500).json({ error: "Erro ao excluir o pagamento" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});
