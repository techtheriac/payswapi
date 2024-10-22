import { Router } from "express";
import { getOne, getAll } from "./handlers/people";
import { getPlanetById, getPlanets } from "./handlers/planets";

const router = Router();

/**
 * People
 */
router.get("/people", getAll);
router.get("/people/:id", getOne);

/**
 * Planets
 */
router.get("/planets", getPlanets);
router.get("/planets/:id", getPlanetById);

export default router;
