import {Skill} from "@interfaces/skill";
import {Celula} from "@interfaces/celula";
import {Petitioner} from "@interfaces/petitioner";

export interface ResourceRequest {
  id: number
  requestStatus: { id: number, status: string }
  requestType: { id: number, type: string }
  hasBudget: boolean
  authorizationFile: string
  maximumEntryDate: string
  comments: string
  priority: string
  petitioner: Petitioner
  celula: Partial<Celula>
  skills: Skill[]
}

export interface AddResourceRequest {
  requestStatus: number
  requestType: number
  hasBudget: boolean
  priority: string
  maximumEntryDate: string
  petitionerId: number
  celulaId: number
  user: string
  skills: number[]
}

export interface TableResourceRequest {
  id: number
  petitioner: string
  tribuName: string
  celulaNameProduct: string
  status: string
  typeRequest: string
  hasBudget: boolean
  priority: string
  maximumEntryDate: string
}

export interface UpdateResourceRequest {
  id: number
  requestStatus: number
  comments: string
  approximateEntryDate: string
  priority: string

}
