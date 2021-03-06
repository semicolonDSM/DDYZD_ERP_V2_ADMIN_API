import { Request, Response, NextFunction } from "express";
import ClubService from "../services/clubService";

export default class ClubController {
    private clubService = new ClubService();

    public clubList = async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.clubService.clubList();
        return res.status(200).json(result);
    }
    
    public setBudget = async (req: Request, res: Response, next: NextFunction) => {
        const { budget }: { budget: number } = req.body;
        await this.clubService.setBudget(req.params.club_id as unknown as number, budget);
        return res.status(200).json({ message: "Supply accepted" });
    }

    public clubSupplyList = async (req: Request, res: Response, next: NextFunction) => {
        const list = await this.clubService.clubSupplyList(req.params.club_id as unknown as number, req.query.state as unknown as number);
        return res.status(200).json(list);
    }

    public newClub = async (req: Request, res: Response, next: NextFunction) => {
        const { club_name, gcn }: { club_name: string; gcn: number; } = req.body;
        await this.clubService.newClub(club_name, gcn);
        return res.status(200).json({ message: "Club created" });
    }

    public deleteClub = async (req: Request, res: Response, next: NextFunction) => {
        await this.clubService.deleteClub(req.params.club_id as unknown as number);
        return res.status(200).json({ message: "Club deleted" });
    }
}