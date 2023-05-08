export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      character_positions: {
        Row: {
          character_id: number | null
          created_at: string
          has_used_action: boolean | null
          id: number
          initiative: number | null
          is_turn: boolean | null
          map_id: number | null
          movement_left: number | null
          updated_at: string
          x: number | null
          y: number | null
        }
        Insert: {
          character_id?: number | null
          created_at?: string
          has_used_action?: boolean | null
          id?: number
          initiative?: number | null
          is_turn?: boolean | null
          map_id?: number | null
          movement_left?: number | null
          updated_at?: string
          x?: number | null
          y?: number | null
        }
        Update: {
          character_id?: number | null
          created_at?: string
          has_used_action?: boolean | null
          id?: number
          initiative?: number | null
          is_turn?: boolean | null
          map_id?: number | null
          movement_left?: number | null
          updated_at?: string
          x?: number | null
          y?: number | null
        }
      }
      characters: {
        Row: {
          character_data: Json | null
          created_at: string
          hit_points: number | null
          id: number
          image_filename: string | null
          initiative: number | null
          movement_speed: number | null
          name: string
          updated_at: string
        }
        Insert: {
          character_data?: Json | null
          created_at?: string
          hit_points?: number | null
          id?: number
          image_filename?: string | null
          initiative?: number | null
          movement_speed?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          character_data?: Json | null
          created_at?: string
          hit_points?: number | null
          id?: number
          image_filename?: string | null
          initiative?: number | null
          movement_speed?: number | null
          name?: string
          updated_at?: string
        }
      }
      faction_members: {
        Row: {
          character_position_id: number
          faction_id: number
        }
        Insert: {
          character_position_id: number
          faction_id: number
        }
        Update: {
          character_position_id?: number
          faction_id?: number
        }
      }
      factions: {
        Row: {
          created_at: string
          id: number
          name: string
          session_id: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          session_id?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          session_id?: number | null
          updated_at?: string
        }
      }
      maps: {
        Row: {
          created_at: string
          grid_size_x: number | null
          grid_size_y: number | null
          grid_x: number | null
          grid_y: number | null
          id: number
          image_filename: string
          map_x: number | null
          map_y: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          grid_size_x?: number | null
          grid_size_y?: number | null
          grid_x?: number | null
          grid_y?: number | null
          id?: number
          image_filename: string
          map_x?: number | null
          map_y?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          grid_size_x?: number | null
          grid_size_y?: number | null
          grid_x?: number | null
          grid_y?: number | null
          id?: number
          image_filename?: string
          map_x?: number | null
          map_y?: number | null
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          auth_uid: string
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          auth_uid: string
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          auth_uid?: string
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
        }
      }
      profiles_characters: {
        Row: {
          character_id: number
          profile_id: string
        }
        Insert: {
          character_id: number
          profile_id: string
        }
        Update: {
          character_id?: number
          profile_id?: string
        }
      }
      sessions: {
        Row: {
          created_at: string
          current_game_time: unknown
          current_turn: number
          end_time: string | null
          id: number
          map_id: number | null
          notes: string | null
          start_time: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_game_time?: unknown
          current_turn?: number
          end_time?: string | null
          id?: number
          map_id?: number | null
          notes?: string | null
          start_time?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_game_time?: unknown
          current_turn?: number
          end_time?: string | null
          id?: number
          map_id?: number | null
          notes?: string | null
          start_time?: string
          updated_at?: string
        }
      }
      status_effects: {
        Row: {
          character_position_id: number | null
          created_at: string
          duration: number | null
          effect_type: string
          id: number
          notes: string | null
          updated_at: string
        }
        Insert: {
          character_position_id?: number | null
          created_at?: string
          duration?: number | null
          effect_type: string
          id?: number
          notes?: string | null
          updated_at?: string
        }
        Update: {
          character_position_id?: number | null
          created_at?: string
          duration?: number | null
          effect_type?: string
          id?: number
          notes?: string | null
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
