interface EloSelectorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

const elos = [
    { value: "IRON", label: "Iron" },
    { value: "BRONZE", label: "Bronze" },
    { value: "SILVER", label: "Silver" },
    { value: "GOLD", label: "Gold" },
    { value: "PLATINUM", label: "Platinum" },
    { value: "EMERALD", label: "Emerald" },
    { value: "DIAMOND", label: "Diamond" },
    { value: "MASTER", label: "Master" },
    { value: "GRANDMASTER", label: "GM" },
    { value: "CHALLENGER", label: "Challenger" },
];

export function EloSelector({ value, onChange, className }: EloSelectorProps) {
    return (
        <div className={`flex items-center gap-1 bg-background rounded-lg p-1 flex-wrap ${className || ""}`}>
            {Array.isArray(elos) &&
                elos.map((elo) => {
                    const active = value === elo.value;
                    return (
                        <button
                            key={elo.value}
                            onClick={() => onChange(elo.value)}
                            className={`
                relative px-3 py-1.5 rounded-md text-sm font-medium
                transition-all duration-200 select-none
                ${
                    active
                        ? "bg-surface text-sky-300 shadow-lg shadow-blue-900/30"
                        : "text-textSecondary opacity-60 hover:opacity-90 hover:bg-surface/50"
                }
              `}
                        >
                            {elo.label}
                            {active && (
                                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-sky-400 rounded-full"></span>
                            )}
                        </button>
                    );
                })}
        </div>
    );
}
