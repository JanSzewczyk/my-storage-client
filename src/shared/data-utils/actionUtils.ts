import Action from "../types/action/Action";
import ActionDto from "../types/action/ActionDto";
import { updateObject } from "../utils/utility";

export const mapActionDtoToAction = (actionDto: ActionDto): Action =>
  updateObject(actionDto, {
    createdAt: new Date(actionDto.createdAt),
  });
