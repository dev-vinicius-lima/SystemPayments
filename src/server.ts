import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import route from "./routes/route";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(route);
const prisma = new PrismaClient();

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
        salary: salary ?? 0,
        store: store ?? "",
        datePayment: datePayment ?? new Date(),
        salaryTotal: salaryTotal ?? 0,
        overTime: overTime ?? 0,
        advanceMoney: advanceMoney ?? 0,
        cardLoan: cardLoan ?? 0,
        discounts: discounts ?? 0,
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
