import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiResponse } from "../utils/api-response";
import prisma from "@repo/db/db";

const askAiQuestion = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const user = req.body.user;
    const { question, issueId } = req.body;

    if (!question || !issueId) {
        return res.status(400).json(
            new ApiResponse(400, "Question & issueId is required")
        );
    }

    if (user.aiQuestionLimit <= user.currentAiQuestion) {
        return res.status(400).json(
            new ApiResponse(400, "freeTrial limit reached")
        );
    }

    const issue = await prisma.issue.findUnique({
        where: { id: issueId }
    });

    if (!issue) {
        return res.status(404).json(
            new ApiResponse(404, "Issue not found")
        );
    }

    const prompt = `
    You are Issue Scout (Help to summarise and solve github issues), an expert AI assistant and exceptional senior software developer with vast knowledge and give advice on the issues and issue is :
        - Title : ${issue.title}
        - Labels : ${issue.labels}
        - issueURL : ${issue.url}
    Now, you need to answer the question : ${question} and give in paragraph format.
    `;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            currentAiQuestion: user.currentAiQuestion + 1,
        },
    });

    return res.status(200).json(
        new ApiResponse(200, result.response.text(), "AI question asked successfully")
    );
})

export { askAiQuestion };