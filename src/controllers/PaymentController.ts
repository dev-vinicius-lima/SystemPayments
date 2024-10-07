import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const Prisma = new PrismaClient();

interface PaymentProps {
  nameEmployee: string;
  salary: number;
  store: string;
  datePayment: string;
  overTime?: number | null;
  bonification?: number | null;
  advanceMoney?: number | null;
  cardLoan?: number | null;
  discounts: number | null;
  salaryTotal: number;
}

class PaymentController {
  store = async (req: Request, res: Response) => {
    try {
      const body = req.body as { [key: string]: any };
      const {
        store,
        nameEmployee,
        salary,
        salaryTotal = 0,
        datePayment = "",
        overTime = 0,
        bonification = 0,
        advanceMoney = 0,
        cardLoan = 0,
        discounts = 0,
      } = body;

      const payment: PaymentProps = await Prisma.payment.create({
        data: {
          nameEmployee: nameEmployee,
          salary: salary,
          store: store,
          salaryTotal: salaryTotal,
          datePayment: datePayment,
          overTime: overTime,
          bonification: bonification,
          advanceMoney: advanceMoney,
          cardLoan: cardLoan,
          discounts: discounts,
        } as PaymentProps,
      });

      res
        .status(201)
        .json({ message: "Pagamento criado com sucesso!", payment });
    } catch (error) {
      console.log("Erro ao criar o pagamento /payments", error);
      res.status(500).json({ error: "Erro ao criar o pagamento" });
    }
  };

  index = async (req: Request, res: Response) => {
    try {
      const payments = await Prisma.payment.findMany();
      res.status(200).json({ payments });
    } catch (error) {
      console.log("Erro ao buscar os pagamentos /payments", error);
      res.status(500).json({ error: "Erro ao buscar os pagamentos" });
    }
  };

  destroy = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const payment = await Prisma.payment.delete({
        where: { id: id },
      });
      res
        .status(200)
        .json({ message: "Pagamento excluido com sucesso!", payment });
    } catch (error) {
      console.log("Erro ao excluir o pagamento /payments/:id", error);
      res.status(500).json({ error: "Erro ao excluir o pagamento" });
    }
  };
}

export default new PaymentController();
