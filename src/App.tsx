import { useState } from 'react';
import { BoonInventory } from './components/BoonInventory';
import { BuildSelector } from './components/BuildSelector';
import { ChamberSelector } from './components/ChamberSelector';
import { DecisionPanel } from './components/DecisionPanel';
import { RunHeader } from './components/RunHeader';
import { StatusTracker } from './components/StatusTracker';
import { useRunEngine } from './hooks/useRunEngine';

function App() {
  const {
    builds,
    activeBuildId,
    activeBuild,
    state,
    recommendation,
    startRun,
    resetRun,
    updateState,
    updateInventory,
    toggleChamberOption,
  } = useRunEngine();
  const [selectedBuildId, setSelectedBuildId] = useState(builds[0].id);

  if (!activeBuildId) {
    return (
      <BuildSelector
        builds={builds}
        selectedBuildId={selectedBuildId}
        onSelect={setSelectedBuildId}
        onStart={startRun}
      />
    );
  }

  return (
    <main className="app-shell">
      <RunHeader build={activeBuild} onReset={resetRun} />
      <StatusTracker state={state} onChange={updateState} />
      <DecisionPanel recommendation={recommendation} />
      <ChamberSelector
        selectedOptions={state.chamberOptions}
        desiredBoonOffered={state.desiredBoonOffered}
        onToggleOption={toggleChamberOption}
        onDesiredBoonOfferedChange={(desiredBoonOffered) => updateState({ desiredBoonOffered })}
      />
      <BoonInventory build={activeBuild} inventory={state.inventory} onChange={updateInventory} />
    </main>
  );
}

export default App;
