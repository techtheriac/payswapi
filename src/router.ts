import { Router } from "express";
import { getOnePerson, getAllPersons } from "./handlers/people";
import { getAllPlanets, getOnePlanet } from "./handlers/planets";

const router = Router();

router.get("/people", getAllPersons);
router.get("/people/:id", getOnePerson);

/**
 * Planets
 */
router.get("/planets", getAllPlanets);
router.get("/planets/:id", getOnePlanet);

export default router;
