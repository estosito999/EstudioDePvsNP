export const complexityCodeSnippets: Record<string, string> = {
  P: `def is_reachable(graph, source, target):
    """P: busqueda en grafo en tiempo polinomial."""
    seen = {source}
    frontier = [source]

    while frontier:
        node = frontier.pop()
        if node == target:
            return True
        for nxt in graph[node]:
            if nxt not in seen:
                seen.add(nxt)
                frontier.append(nxt)
    return False`,
  NP: `def verify_certificate(instance, certificate):
    """NP: no buscamos la solucion, verificamos una propuesta."""
    return check_constraints(instance, certificate)`,
  'co-NP': `def refute_instance(instance, proof_hint):
    """co-NP: intuicion de certificado para respuestas negativas."""
    return proof_system_accepts_refutation(instance, proof_hint)`,
  'NP-Complete': `def prove_np_complete(problem):
    in_np = has_polynomial_verifier(problem)
    hard = reduce_every_np_problem_to(problem)
    return in_np and hard`,
  'NP-Hard': `def use_np_hard_oracle(instance):
    """NP-hard no implica pertenecer a NP."""
    return solve_problem_at_least_as_hard_as_np(instance)`,
  PSPACE: `def qbf_eval(formula, environment):
    """PSPACE: recursion profunda reutilizando espacio."""
    if formula.is_atom():
        return formula.value(environment)
    if formula.quantifier == "exists":
        return any(qbf_eval(formula.body, environment | {formula.var: v}) for v in [False, True])
    if formula.quantifier == "forall":
        return all(qbf_eval(formula.body, environment | {formula.var: v}) for v in [False, True])`,
  EXP: `def exponential_time_decider(instance):
    for candidate in all_strings_up_to_exponential_bound(instance):
        if accepts(instance, candidate):
            return True
    return False`,
  BPP: `def bpp_decider(instance, trials=80):
    votes = 0
    for _ in range(trials):
        votes += randomized_trial(instance)
    return votes > trials * 2 // 3`,
  RP: `def rp_decider(instance, trials=80):
    for _ in range(trials):
        if randomized_witness_search(instance):
            return True
    return False`,
  ZPP: `def zpp_decider(instance):
    while True:
        answer = las_vegas_step(instance)
        if answer != "retry":
            return answer`,
  AC0: `# AC0: circuitos de profundidad constante.
# PARITY requiere mas que profundidad constante con fan-in no acotado.
depth = O(1)
size = polynomial(n)`,
  NC: `# NC: computacion paralela eficiente.
parallel_depth = polylog(n)
processor_count = polynomial(n)`,
  'P/poly': `# P/poly: una familia de circuitos por longitud de entrada.
def decide_with_advice(x):
    circuit = advice_circuit_for_length(len(x))
    return circuit.evaluate(x)`,
  '2-SAT': `def verify_2sat_assignment(clauses, assignment):
    return all(any(lit.eval(assignment) for lit in clause) for clause in clauses)

# Resolver 2-SAT eficientemente usa grafo de implicaciones y SCC.`,
  SAT: `def verify_sat(formula, assignment):
    return formula.evaluate(assignment) is True`,
  '3-SAT': `def brute_force_3sat(formula, variables):
    for assignment in all_boolean_assignments(variables):
        if formula.evaluate(assignment):
            return True
    return False

# Que este algoritmo sea exponencial no demuestra P != NP.`,
  CLIQUE: `def verify_clique(graph, vertices, k):
    if len(vertices) < k:
        return False
    return all(graph.has_edge(u, v) for u in vertices for v in vertices if u < v)`,
  'VERTEX-COVER': `def verify_vertex_cover(graph, cover, k):
    if len(cover) > k:
        return False
    return all(u in cover or v in cover for (u, v) in graph.edges)`,
  'SUBSET-SUM': `def verify_subset_sum(numbers, target, chosen_indexes):
    return sum(numbers[i] for i in chosen_indexes) == target`,
  'TSP Decision': `def verify_tsp_tour(dist, tour, bound):
    cost = sum(dist[tour[i]][tour[(i + 1) % len(tour)]] for i in range(len(tour)))
    return cost <= bound`,
  TAUTOLOGY: `def refute_tautology(formula, assignment):
    """El complemento de TAUTOLOGY pregunta por una asignacion que falsifique."""
    return formula.evaluate(assignment) is False`,
  QBF: `def eval_qbf(node, env):
    if node.kind == "exists":
        return any(eval_qbf(node.body, env | {node.var: value}) for value in [False, True])
    if node.kind == "forall":
        return all(eval_qbf(node.body, env | {node.var: value}) for value in [False, True])
    return node.evaluate(env)`,
  PARITY: `def parity(bits):
    result = 0
    for bit in bits:
        result ^= bit
    return result`,
};

export const fallbackCodeSnippet = `# No hay snippet especifico todavia.
# Este nodo queda preparado para una futura simulacion local.`;
