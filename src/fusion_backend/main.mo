import Debug "mo:base/Debug";
import Array "mo:base/Array";

type Activity = {
    id: Nat;
    description: Text;
};

actor Mimi {
    stable var activities: [Activity] = [];
    stable var nextId: Nat = 0;

    // Agregar una nueva actividad
    public func addActivity(description: Text): async Nat {
        let newActivity: Activity = {
            id = nextId;
            description = description;
        };
        activities := Array.append(activities, [newActivity]);
        nextId := nextId + 1;
        return newActivity.id;
    };

    // Obtener todas las actividades
   public query func getActivities(): async [Activity] {
    return activities;
};
};
