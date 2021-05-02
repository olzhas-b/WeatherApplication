from weatherAPI.newtonraphsonpy import NewtonRaphson


def calculate():
    finder = NewtonRaphson(epsilon=0.001)
    root = finder.solve(guess=-20)
    return root