export interface Dataschema {
  itr: number;
  xl: number;
  xr: number;
  xm: number;
  fx: number;
  err: number;
}

export interface OnePoint{
  itr: number;
  fx0: number;
  fx1: number;
  x0: number;
  x1: number;
  err: number;
}

export interface NewtonRaphson
{
  itr: number;
  xi: number;
  err: number;
}
