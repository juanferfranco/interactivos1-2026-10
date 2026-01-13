interface Activity {
    nombre: string;
    estado: string;
    fase: string;
  }
  
  export const countByPhase = (actividades: Activity[], phase: string, onlyCompleted: boolean = false): number => {
    return actividades.filter(act => 
      act.fase === phase && 
      (onlyCompleted ? act.estado === "Completada" : true)
    ).length;
  };
  
  export const calculateUnitGrade = (actividades: Activity[]): number => {
    const setRatio = countByPhase(actividades, 'set', true) / (countByPhase(actividades, 'set') || 1);
    const seekRatio = countByPhase(actividades, 'seek', true) / (countByPhase(actividades, 'seek') || 1);
    const applyRatio = countByPhase(actividades, 'apply', true) / (countByPhase(actividades, 'apply') || 1);
    const reflectRatio = countByPhase(actividades, 'reflect', true) / (countByPhase(actividades, 'reflect') || 1);  
    
    return 0.5 * setRatio + 1.5 * seekRatio + 1.5 * applyRatio + 1.5 * reflectRatio;
  };