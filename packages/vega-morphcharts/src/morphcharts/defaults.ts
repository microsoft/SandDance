/*!
* Copyright (c) Microsoft Corporation.
* Licensed under the MIT License.
*/

import { quat, vec3 } from 'gl-matrix';
import { Constants, Helpers } from 'morphcharts';

function createCameraDefaults() {
    const qModelRotation2d = quat.create();
    const qModelRotation3d = Constants.QUAT_ROTATEX_MINUS_90;
    const qCameraRotation2d = quat.create();
    const qCameraRotation3d = quat.create();
    const qAngle = quat.create();
    const vCameraPosition = vec3.create();

    // Altitude (pitch around local right axis)
    quat.setAxisAngle(qCameraRotation3d, Constants.VECTOR3_UNITX, Helpers.AngleHelper.degreesToRadians(30));

    // Azimuth (yaw around global up axis)
    quat.setAxisAngle(qAngle, Constants.VECTOR3_UNITY, Helpers.AngleHelper.degreesToRadians(-25));
    quat.multiply(qCameraRotation3d, qCameraRotation3d, qAngle);

    return {
        qModelRotation2d,
        qModelRotation3d,
        qCameraRotation2d,
        qCameraRotation3d,
        vCameraPosition,
    };
}

export const cameraDefaults = createCameraDefaults();
