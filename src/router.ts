import { Router } from "express";
import { getPeople, getPeopleById } from "./handlers/people";
import { getPlanetById, getPlanets } from "./handlers/planets";

const router = Router();

/**
 * People
 */
router.get("/people", getPeople);
router.get("/people/:id", getPeopleById);

/**
 * Planets
 */
router.get("/planets", getPlanets);
router.get("/planets/:id", getPlanetById);

export default router;
