from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from z3 import Bool, Not, Or, Solver, is_true, sat


class LiteralPayload(BaseModel):
    variable: str = Field(min_length=1)
    negated: bool = False


class ClausePayload(BaseModel):
    literals: list[LiteralPayload]


class SolveSatPayload(BaseModel):
    variables: list[str]
    clauses: list[ClausePayload]


class SolveSatResponse(BaseModel):
    status: str
    model: dict[str, bool] = {}


app = FastAPI(title="Visual Theory Lab API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/sat/solve-z3", response_model=SolveSatResponse)
def solve_z3(payload: SolveSatPayload) -> SolveSatResponse:
    variables = sorted(set(payload.variables) | {literal.variable for clause in payload.clauses for literal in clause.literals})
    z3_vars = {name: Bool(name) for name in variables}
    solver = Solver()

    for clause in payload.clauses:
        z3_literals = []
        for literal in clause.literals:
            term = z3_vars[literal.variable]
            z3_literals.append(Not(term) if literal.negated else term)
        solver.add(Or(*z3_literals))

    result = solver.check()
    if result != sat:
        return SolveSatResponse(status="UNSAT", model={})

    model = solver.model()
    assignment = {name: bool(is_true(model.evaluate(z3_vars[name], model_completion=True))) for name in variables}
    return SolveSatResponse(status="SAT", model=assignment)
