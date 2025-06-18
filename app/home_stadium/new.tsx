import ImagePicker from "@/components/ImagePicker";
import { teamSchema, TTeam } from "@/components/logic/team-type";
import useStadiumForm from "@/components/logic/use-stadium-form";
import useImage from "@/components/logic/useImage";
import { Button, ButtonText } from "@/components/ui/button";
import {
    FormControl,
    FormControlHelperText,
    FormControlLabel,
    FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import {
    Select,
    SelectBackdrop,
    SelectIcon,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger,
} from "@/components/ui/select";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { ChevronDown } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function NewStadium() {
    const { formData, setFormData } = useStadiumForm();
    const { img: image, pickImageAsync } = useImage();
    const handleSubmit = () => {
        console.log(formData);
    };
    const router = useRouter();
    return (
        <View>
            <VStack className="w-full max-w-[300px] rounded-md border border-background-200 p-4">
                <FormControl size="md">
                    <FormControlLabel>
                        <FormControlLabelText>name</FormControlLabelText>
                    </FormControlLabel>
                    <Input>
                        <InputField
                            type="text"
                            value={formData.name}
                            onChangeText={(value) =>
                                setFormData({
                                    ...formData,
                                    name: value,
                                })
                            }
                            placeholder="홍길동의 홈구장"
                        />
                    </Input>
                    <FormControlHelperText>
                        홈구장 이름은 닉네임으로 사용됩니다.
                    </FormControlHelperText>
                    <FormControlLabel>
                        <FormControlLabelText>team</FormControlLabelText>
                    </FormControlLabel>
                    <Select
                        onValueChange={(value) =>
                            setFormData({
                                ...formData,
                                team: value as TTeam,
                            })
                        }
                    >
                        <SelectTrigger variant="outline" size="md">
                            <SelectInput placeholder="팀을 선택해주세요" />
                            <SelectIcon className="mr-3" as={ChevronDown} />
                        </SelectTrigger>
                        <SelectPortal>
                            <SelectBackdrop />
                            {teamSchema.options.map((team) => {
                                return (
                                    <SelectItem
                                        key={team}
                                        label={team}
                                        value={team}
                                    />
                                );
                            })}
                        </SelectPortal>
                    </Select>
                    <ImagePicker pickImageAsync={pickImageAsync} />
                </FormControl>
                <Button
                    size="md"
                    variant="outline"
                    onPress={() => {
                        console.log({ formData, ...image }, "form Submitted!");
                        // handleSubmit(formData)
                        router.replace("../home");
                    }}
                >
                    <ButtonText>Submit</ButtonText>
                </Button>
            </VStack>
        </View>
    );
}
