import { DocumentNode } from 'graphql';

// Query planner types
export type PlanNode = ResolveNode | SequenceNode | ParallelNode;

export interface ResolveNode {
  type: 'Resolve';
  subgraph: string;
  document: DocumentNode;
  provided?: {
    selections?: Map<string, string[]>;
    variablesInSelections?: Map<string, Map<string, string[]>>;
    selectionFields?: Map<string, Map<string, string[]>>;
  };
  required?: {
    variables?: string[];
    selections?: Map<string, string[]>;
  };
  batch?: boolean;
}

export interface SequenceNode {
  type: 'Sequence';
  nodes: PlanNode[];
}

export interface ParallelNode {
  type: 'Parallel';
  nodes: PlanNode[];
}

// Schema types
export type ResolverKind = 'FETCH' | 'BATCH' | 'SUBSCRIBE';

export interface ResolverVariableConfig {
  name: string;
  select?: string;
  value?: string;
  subgraph?: string;
  type?: string;
}

export type ResolverConfig = ResolverRefConfig | GlobalResolverConfig | RegularResolverConfig;

export interface ResolverRefConfig {
  name: string;
  subgraph: string;
}

export interface GlobalResolverConfig {
  name: string;
  operation: string;
  kind?: ResolverKind;
  subgraph: string;
}

export interface RegularResolverConfig {
  operation: string;
  kind?: ResolverKind;
  subgraph: string;
}
